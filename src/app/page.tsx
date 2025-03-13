'use client';

import { useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import LandingPage from './components/LandingPage';
import { useTranslation } from 'react-i18next';
import I18nProvider from '../components/I18nProvider';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LanguagePrompt from '../components/LanguagePrompt';

function HomePage() {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<string>('avif');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) {
        setError(t('errors.fileSize'));
        return;
      }
      if (!selectedFile.type.startsWith('image/')) {
        setError(t('errors.invalidType'));
        return;
      }
      setSelectedFile(selectedFile);
      setError('');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 4 * 1024 * 1024) {
        setError(t('errors.fileSize'));
        return;
      }
      if (!droppedFile.type.startsWith('image/')) {
        setError(t('errors.invalidType'));
        return;
      }
      setSelectedFile(droppedFile);
      setError('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError(t('errors.noFile'));
      return;
    }

    setIsConverting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('quality', quality.toString());
      formData.append('outputFormat', outputFormat);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.unknown'));
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <LanguagePrompt />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <Image
            src="/logo.webp"
            alt={t('header.title')}
            width={200}
            height={60}
            priority
          />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <div className="text-gray-600">
              <p className="mb-2">{t('upload.dragDrop')}</p>
              <button 
                onClick={handleButtonClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t('upload.button')}
              </button>
              <p className="mt-2 text-sm">
                {t('upload.supportedFormats')}, {t('upload.maxSize')}
              </p>
            </div>
          </div>

          {selectedFile && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {t('upload.selected')} {selectedFile.name}
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t('quality.label')}
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full p-2 border rounded-lg bg-white/5 border-gray-600"
            >
              <option value="90">{t('quality.high')}</option>
              <option value="75">{t('quality.medium')}</option>
              <option value="50">{t('quality.low')}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {t('format.label')}
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white/5 border-gray-600"
            >
              <option value="avif">{t('format.avif')}</option>
              <option value="webp">{t('format.webp')}</option>
              <option value="jpg">{t('format.jpg')}</option>
              <option value="png">{t('format.png')}</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConvert}
            disabled={!selectedFile || isConverting}
          >
            {isConverting ? t('conversion.processing') : t('conversion.button')}
          </button>
        </div>
      </div>

      <LandingPage />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <I18nProvider>
        <HomePage />
      </I18nProvider>
    </Suspense>
  );
}
