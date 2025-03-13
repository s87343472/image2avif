'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
  question: string;
  answer: string;
}

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <h1 className="sr-only">{t('header.title')}</h1>
      
      {/* 特点部分 */}
      <section aria-labelledby="features-heading" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📦',
                title: t('features.compression.title'),
                description: t('features.compression.description')
              },
              {
                icon: '🖼️',
                title: t('features.quality.title'),
                description: t('features.quality.description')
              },
              {
                icon: '🚀',
                title: t('features.speed.title'),
                description: t('features.speed.description')
              },
              {
                icon: '📱',
                title: t('features.data.title'),
                description: t('features.data.description')
              },
              {
                icon: '🔍',
                title: t('features.seo.title'),
                description: t('features.seo.description')
              },
              {
                icon: '🌍',
                title: t('features.compatibility.title'),
                description: t('features.compatibility.description')
              }
            ].map((feature, index) => (
              <article key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 使用方法部分 */}
      <section aria-labelledby="howto-heading" className="py-20">
        <div className="container mx-auto px-4">
          <h2 id="howto-heading" className="text-3xl font-bold text-center mb-16">{t('howTo.title')}</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200" aria-hidden="true"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {[
                {
                  number: '1',
                  title: t('howTo.step1.title'),
                  description: t('howTo.step1.description')
                },
                {
                  number: '2',
                  title: t('howTo.step2.title'),
                  description: t('howTo.step2.description')
                },
                {
                  number: '3',
                  title: t('howTo.step3.title'),
                  description: t('howTo.step3.description')
                }
              ].map((step, index) => (
                <article key={index} className="text-center flex flex-col items-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold relative z-10" aria-label={`Step ${step.number}`}>
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600 max-w-xs mx-auto">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ部分 */}
      <section aria-labelledby="faq-heading" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">{t('faq.title')}</h2>
          <div className="max-w-3xl mx-auto">
            {(t('faq.items', { returnObjects: true }) as FaqItem[]).map((item, index) => (
              <article key={index} className="mb-4">
                <button
                  className="w-full text-left bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold">{item.question}</span>
                  <span className="text-2xl" aria-hidden="true">{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="bg-white p-4 rounded-lg mt-2 shadow-sm"
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('header.title')}</h2>
              <p className="text-gray-400">{t('meta.description')}</p>
            </div>
            <nav aria-label="Quick links">
              <h2 className="text-xl font-semibold mb-4">Links</h2>
              <ul className="space-y-2">
                <li><a href="https://suno-top.com/?ytm=avif" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Suno Top</a></li>
                <li><a href="https://www.metric-converter.com/?ytm=avif" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Metric Converter</a></li>
                <li><a href="https://aimangatranslator.com/?ytm=avif" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">AI Manga Translator</a></li>
                <li><a href="https://producthuntdaily.com/?ytm=avif" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Product Hunt Daily</a></li>
                <li><a href="https://showhntoday.com/?ytm=avif" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Show HN Today</a></li>
              </ul>
            </nav>
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('footer.contact')}</h2>
              <ul className="space-y-2">
                <li><a href="mailto:support@metric-converter.com" className="text-gray-400 hover:text-white">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 