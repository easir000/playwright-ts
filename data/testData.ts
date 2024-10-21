export function getRandomArticleData() {
    return {
      title: `Test Title ${Math.random() * 1000}`,
      description: 'Test description',
      body: 'Test body content',
      tag: `tag${Math.random() * 1000}`,
    };
  }
  