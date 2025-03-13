'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguagePrompt() {
  const { i18n } = useTranslation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [browserLang, setBrowserLang] = useState('');

  useEffect(() => {
    // 获取浏览器语言
    const detectLanguage = () => {
      const lang = navigator.language.split('-')[0];
      const supportedLangs = ['zh', 'en', 'fr', 'de', 'ja', 'ru'];
      return supportedLangs.includes(lang) ? lang : 'en';
    };

    const browserLanguage = detectLanguage();
    setBrowserLang(browserLanguage);

    // 如果浏览器语言与当前语言不同，显示提示
    if (browserLanguage !== i18n.language && !localStorage.getItem('langPromptDismissed')) {
      setShowPrompt(true);
    }
  }, [i18n.language]);

  const handleAccept = () => {
    i18n.changeLanguage(browserLang);
    setShowPrompt(false);
    localStorage.setItem('langPromptDismissed', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('langPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  const languageNames: { [key: string]: string } = {
    zh: '中文',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    ja: '日本語',
    ru: 'Русский'
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm z-50 border border-gray-200">
      <p className="text-sm text-gray-700 mb-3">
        {i18n.language === 'zh' 
          ? `是否切换到${languageNames[browserLang]}？`
          : `Switch to ${languageNames[browserLang]}?`}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleDismiss}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {i18n.language === 'zh' ? '取消' : 'Cancel'}
        </button>
        <button
          onClick={handleAccept}
          className="text-sm text-blue-500 hover:text-blue-700 font-medium"
        >
          {i18n.language === 'zh' ? '切换' : 'Switch'}
        </button>
      </div>
    </div>
  );
} 