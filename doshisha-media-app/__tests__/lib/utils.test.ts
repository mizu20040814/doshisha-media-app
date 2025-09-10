import {
  getCategoryLabel,
  getCategoryColor,
  cleanMarkdownForPreview,
  formatDate,
  formatDateLong,
  CATEGORY_LABELS,
  CATEGORY_COLORS
} from '@/lib/utils'

describe('utils', () => {
  describe('getCategoryLabel', () => {
    it('returns the correct label for known categories', () => {
      expect(getCategoryLabel('news')).toBe('ニュース')
      expect(getCategoryLabel('column')).toBe('コラム')
      expect(getCategoryLabel('interview')).toBe('インタビュー')
      expect(getCategoryLabel('survey')).toBe('アンケート企画')
    })

    it('returns the original category for unknown categories', () => {
      expect(getCategoryLabel('unknown')).toBe('unknown')
      expect(getCategoryLabel('custom')).toBe('custom')
    })
  })

  describe('getCategoryColor', () => {
    it('returns the correct color class for known categories', () => {
      expect(getCategoryColor('news')).toBe('border-red-600 text-red-600')
      expect(getCategoryColor('column')).toBe('border-blue-600 text-blue-600')
      expect(getCategoryColor('interview')).toBe('border-green-600 text-green-600')
      expect(getCategoryColor('survey')).toBe('border-purple-600 text-purple-600')
    })

    it('returns default color class for unknown categories', () => {
      expect(getCategoryColor('unknown')).toBe('border-gray-600 text-gray-600')
      expect(getCategoryColor('custom')).toBe('border-gray-600 text-gray-600')
    })
  })

  describe('cleanMarkdownForPreview', () => {
    it('removes markdown headers', () => {
      const input = '# Header 1\n## Header 2\n### Header 3\nText'
      const expected = 'Header 1\nHeader 2\nHeader 3\nText'
      expect(cleanMarkdownForPreview(input)).toContain('Header 1')
      expect(cleanMarkdownForPreview(input)).not.toContain('#')
    })

    it('removes markdown bold formatting', () => {
      const input = '**bold text** and __another bold__'
      const expected = 'bold text and another bold'
      expect(cleanMarkdownForPreview(input)).toBe(expected)
    })

    it('removes markdown italic formatting', () => {
      const input = '*italic text* and _another italic_'
      const expected = 'italic text and another italic'
      expect(cleanMarkdownForPreview(input)).toBe(expected)
    })

    it('removes markdown links', () => {
      const input = 'Check out [this link](https://example.com) for more info'
      const expected = 'Check out this link for more info'
      expect(cleanMarkdownForPreview(input)).toBe(expected)
    })

    it('removes markdown images', () => {
      const input = 'Here is an image ![alt text](image.jpg) in the text'
      const result = cleanMarkdownForPreview(input)
      expect(result).toContain('Here is an image')
      expect(result).toContain('in the text')
      expect(result).not.toContain('![alt text]')
      expect(result).not.toContain('(image.jpg)')
    })

    it('removes code blocks', () => {
      const input = 'Text before\n```javascript\nconst x = 1;\n```\nText after'
      const result = cleanMarkdownForPreview(input)
      expect(result).not.toContain('```')
      expect(result).not.toContain('const x = 1')
      expect(result).toContain('Text before')
      expect(result).toContain('Text after')
    })

    it('removes inline code', () => {
      const input = 'Use `npm install` to install dependencies'
      const expected = 'Use npm install to install dependencies'
      expect(cleanMarkdownForPreview(input)).toBe(expected)
    })

    it('truncates long text with ellipsis', () => {
      const longText = 'a'.repeat(200)
      const result = cleanMarkdownForPreview(longText, 100)
      expect(result).toHaveLength(103) // 100 + '...'
      expect(result.endsWith('...')).toBe(true)
    })

    it('does not add ellipsis for short text', () => {
      const shortText = 'Short text'
      const result = cleanMarkdownForPreview(shortText, 100)
      expect(result).toBe('Short text')
      expect(result).not.toContain('...')
    })

    it('removes list markers', () => {
      const input = '- Item 1\n* Item 2\n+ Item 3\n1. Numbered item'
      const result = cleanMarkdownForPreview(input)
      expect(result).toContain('Item 1')
      expect(result).toContain('Item 2')
      expect(result).toContain('Item 3')
      expect(result).toContain('Numbered item')
      expect(result).not.toContain('-')
      expect(result).not.toContain('*')
      expect(result).not.toContain('+')
      expect(result).not.toContain('1.')
    })

    it('removes blockquotes', () => {
      const input = '> This is a quote\n> Another line'
      const result = cleanMarkdownForPreview(input)
      expect(result).toContain('This is a quote')
      expect(result).not.toContain('>')
    })
  })

  describe('formatDate', () => {
    it('formats date in Japanese format (YYYY/MM/DD)', () => {
      const date = '2024-03-15T10:30:00Z'
      const result = formatDate(date)
      expect(result).toMatch(/2024\/3\/15/)
    })

    it('handles different date formats', () => {
      const date1 = '2024-01-01'
      const date2 = new Date('2024-12-31').toISOString()
      
      expect(formatDate(date1)).toMatch(/2024\/1\/1/)
      expect(formatDate(date2)).toMatch(/2024\/12\/31/)
    })
  })

  describe('formatDateLong', () => {
    it('formats date in long Japanese format', () => {
      const date = '2024-03-15T10:30:00Z'
      const result = formatDateLong(date)
      expect(result).toContain('2024年')
      expect(result).toContain('3月')
      expect(result).toContain('15日')
    })

    it('handles different months correctly', () => {
      const january = '2024-01-01'
      const december = '2024-12-31'
      
      expect(formatDateLong(january)).toContain('1月')
      expect(formatDateLong(december)).toContain('12月')
    })
  })

  describe('constants', () => {
    it('CATEGORY_LABELS contains all expected categories', () => {
      expect(CATEGORY_LABELS).toHaveProperty('news')
      expect(CATEGORY_LABELS).toHaveProperty('column')
      expect(CATEGORY_LABELS).toHaveProperty('interview')
      expect(CATEGORY_LABELS).toHaveProperty('survey')
    })

    it('CATEGORY_COLORS contains all expected categories', () => {
      expect(CATEGORY_COLORS).toHaveProperty('news')
      expect(CATEGORY_COLORS).toHaveProperty('column')
      expect(CATEGORY_COLORS).toHaveProperty('interview')
      expect(CATEGORY_COLORS).toHaveProperty('survey')
    })
  })
})