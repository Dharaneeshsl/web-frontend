import React, { useState } from 'react';

function BulkURLShortener() {
  const [urlInput, setUrlInput] = useState('');
  const [urlList, setUrlList] = useState([]);

  const handleAddUrl = () => {
    const trimmedUrl = urlInput.trim();
    if (trimmedUrl && !urlList.includes(trimmedUrl)) {
      setUrlList([...urlList, trimmedUrl]);
      setUrlInput('');
    }
  };

  const handleDeleteUrl = (urlToDelete) => {
    setUrlList(urlList.filter(url => url !== urlToDelete));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddUrl();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Enter URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={handleKeyPress}
       
        />
        <button onClick={handleAddUrl}>+</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {urlList.map((url, index) => (
          <div
            key={index}
            style={{
              padding: '8px 12px',
              backgroundColor: '#000000',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>{url}</span>
            <button
              onClick={() => handleDeleteUrl(url)}
              style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BulkURLShortener;