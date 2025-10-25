import { useState } from 'react';

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ru');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'Английский' },
    { code: 'ru', name: 'Русский' },
    { code: 'es', name: 'Испанский' },
    { code: 'fr', name: 'Французский' },
    { code: 'de', name: 'Немецкий' },
    { code: 'it', name: 'Итальянский' },
    { code: 'pt', name: 'Португальский' },
    { code: 'zh', name: 'Китайский' },
    { code: 'ja', name: 'Японский' },
    { code: 'ko', name: 'Корейский' },
    { code: 'ar', name: 'Арабский' },
  ];

  const translateText = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    try {
      // В будущем подключим к реальному API
      // const response = await fetch('http://localhost:3000/api/translator/translate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     text: sourceText,
      //     source: sourceLang,
      //     target: targetLang
      //   })
      // });
      // const data = await response.json();

      // Симуляция перевода
      setTimeout(() => {
        setTranslatedText(`[Перевод с ${sourceLang} на ${targetLang}]: ${sourceText}`);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Ошибка перевода:', error);
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    const tempText = sourceText;
    const tempLang = sourceLang;

    setSourceText(translatedText);
    setSourceLang(targetLang);
    setTranslatedText(tempText);
    setTargetLang(tempLang);
  };

  const clearText = () => {
    setSourceText('');
    setTranslatedText('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i className="fas fa-language fa-3x text-warning mb-3"></i>
                <h2 className="mb-2">Переводчик</h2>
                <p className="text-muted">Переводите тексты на 100+ языков мгновенно</p>
              </div>

              <div className="row g-4">
                {/* Исходный текст */}
                <div className="col-md-5">
                  <div className="mb-3">
                    <label className="form-label">
                      Исходный язык:
                      <select
                        className="form-select"
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <textarea
                    className="form-control mb-3"
                    rows={8}
                    placeholder="Введите текст для перевода..."
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                  />

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary flex-fill"
                      onClick={clearText}
                    >
                      <i className="fas fa-trash me-2"></i>
                      Очистить
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={swapLanguages}
                      disabled={!sourceText && !translatedText}
                    >
                      <i className="fas fa-exchange-alt"></i>
                    </button>
                  </div>
                </div>

                {/* Кнопка перевода */}
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-primary btn-lg rounded-circle d-flex align-items-center justify-content-center"
                    style={{width: '80px', height: '80px'}}
                    onClick={translateText}
                    disabled={!sourceText.trim() || isLoading}
                  >
                    {isLoading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Перевод...</span>
                      </div>
                    ) : (
                      <i className="fas fa-arrow-right fa-lg"></i>
                    )}
                  </button>
                </div>

                {/* Переведенный текст */}
                <div className="col-md-5">
                  <div className="mb-3">
                    <label className="form-label">
                      Целевой язык:
                      <select
                        className="form-select"
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <textarea
                    className="form-control mb-3"
                    rows={8}
                    placeholder="Здесь появится перевод..."
                    value={translatedText}
                    readOnly
                  />

                  {translatedText && (
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-success flex-fill">
                        <i className="fas fa-copy me-2"></i>
                        Скопировать
                      </button>
                      <button className="btn btn-outline-primary flex-fill">
                        <i className="fas fa-volume-up me-2"></i>
                        Прослушать
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Дополнительные функции */}
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="fas fa-lightbulb text-warning me-2"></i>
                        Дополнительные возможности
                      </h5>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="text-center">
                            <i className="fas fa-file-alt fa-2x text-primary mb-2"></i>
                            <h6>Документы</h6>
                            <p className="small text-muted">Перевод файлов PDF, DOC</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <i className="fas fa-globe fa-2x text-success mb-2"></i>
                            <h6>Сайты</h6>
                            <p className="small text-muted">Перевод веб-страниц</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <i className="fas fa-images fa-2x text-info mb-2"></i>
                            <h6>Изображения</h6>
                            <p className="small text-muted">Распознавание и перевод текста</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
