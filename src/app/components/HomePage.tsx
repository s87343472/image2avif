'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import LandingPage from './LandingPage';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import LanguagePrompt from '../../components/LanguagePrompt';
import { convertImageInBrowser, formatFileSize } from '../../utils/clientImageConverter';

export default function HomePage() {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState<'avif' | 'webp' | 'jpeg' | 'png'>('avif');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(t('errors.notImage'));
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setConvertedUrl(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(t('errors.notImage'));
        return;
      }
      setSelectedFile(file);
      setConvertedUrl(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const convertToAVIF = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError(null);

    try {
      const blob = await convertImageInBrowser(
        selectedFile,
        outputFormat,
        quality / 100
      );
      
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.unknown'));
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedUrl) {
      const a = document.createElement('a');
      a.href = convertedUrl;
      a.download = `${selectedFile?.name.split('.')[0] || 'image'}.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSwitcher />
      <LanguagePrompt />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('header.title')}</h1>
            <p className="text-xl text-gray-600">{t('header.subtitle')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              {selectedFile ? (
                <div>
                  <Image 
                    src={URL.createObjectURL(selectedFile)} 
                    alt={selectedFile.name}
                    width={300}
                    height={200}
                    className="mx-auto mb-4 max-h-64 w-auto object-contain"
                  />
                  <p className="text-sm text-gray-500">{selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</p>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2 text-gray-600">{t('upload.dragDrop')}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('upload.or')}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    {t('upload.browse')}
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('quality.label')}: {quality}%
              </label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={quality} 
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{t('quality.low')}</span>
                <span>{t('quality.high')}</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('format.label')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['avif', 'webp', 'jpeg', 'png'] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setOutputFormat(format)}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      outputFormat === format
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={convertToAVIF}
                disabled={!selectedFile || isConverting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  !selectedFile || isConverting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {isConverting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('conversion.processing')}
                  </span>
                ) : (
                  t('conversion.button')
                )}
              </button>
            </div>
          </div>

          {convertedUrl && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('conversion.download')}</h2>
              <div className="mb-4">
                <Image 
                  src={convertedUrl} 
                  alt="Converted Image"
                  width={300}
                  height={200}
                  className="mx-auto max-h-64 w-auto object-contain"
                />
              </div>
              <button 
                onClick={handleDownload}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
              >
                {t('conversion.download')}
              </button>
            </div>
          )}
        </div>
      </main>

      <LandingPage />
    </div>
  );
} 