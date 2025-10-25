import { useState } from 'react';

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('ru');
  const [targetLang, setTargetLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    try {
      // В будущем подключить к реальному API
      // const response = await fetch('/api/translator/translate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text: sourceText, from: sourceLang, to: targetLang })
      // });
      // const data = await response.json();
      // setTranslatedText(data.translatedText);

      // Временная симуляция перевода
      setTimeout(() => {
        setTranslatedText(`[Перевод] ${sourceText} (${sourceLang} → ${targetLang})`);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Ошибка перевода:', error);
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">
                <i className="fas fa-language me-2 text-primary"></i>
                Онлайн переводчик
              </h3>
              <small className="text-muted">Поддержка 100+ языков</small>
            </div>
            <div className="card-body">
              {/* Исходный текст */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">
                    <i className="fas fa-keyboard me-2"></i>
                    Исходный текст
                  </label>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="Введите текст для перевода..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
              </div>

              {/* Кнопка обмена языками */}
              <div className="text-center mb-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={swapLanguages}
                  disabled={!sourceText && !translatedText}
                >
                  <i className="fas fa-exchange-alt"></i>
                </button>
              </div>

              {/* Перевод */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">
                    <i className="fas fa-language me-2"></i>
                    Перевод
                  </label>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="Здесь появится перевод..."
                  value={translatedText}
                  readOnly
                />
              </div>

              {/* Кнопка перевода */}
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg px-5"
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Перевод...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-language me-2"></i>
                      Перевести
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* История переводов */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-history me-2"></i>
                История переводов
              </h5>
            </div>
            <div className="card-body">
              <div className="text-center py-4">
                <i className="fas fa-clock fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">История пуста</h5>
                <p className="text-muted">Здесь будут сохранены ваши переводы</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
