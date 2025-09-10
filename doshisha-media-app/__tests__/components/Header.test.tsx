import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import { usePathname } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock the SearchBar component
jest.mock('@/components/SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="search-bar">Search Bar</div>
  }
})

describe('Header', () => {
  beforeEach(() => {
    // Reset the mock before each test
    (usePathname as jest.Mock).mockReturnValue('/')
  })

  it('renders the site title', () => {
    render(<Header />)
    const title = screen.getByText('同志社メディア')
    expect(title).toBeInTheDocument()
  })

  it('renders the site title as a link to home', () => {
    render(<Header />)
    const titleLink = screen.getByRole('link', { name: '同志社メディア' })
    expect(titleLink).toHaveAttribute('href', '/')
  })

  it('renders all category navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText('全て')).toBeInTheDocument()
    expect(screen.getByText('ニュース')).toBeInTheDocument()
    expect(screen.getByText('コラム')).toBeInTheDocument()
    expect(screen.getByText('インタビュー')).toBeInTheDocument()
    expect(screen.getByText('アンケート企画')).toBeInTheDocument()
  })

  it('renders the search bar on desktop', () => {
    render(<Header />)
    const searchBar = screen.getByTestId('search-bar')
    expect(searchBar).toBeInTheDocument()
  })

  it('highlights the active category when on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/')
    render(<Header />)
    
    const allCategory = screen.getByText('全て').closest('a')
    expect(allCategory).toHaveClass('text-doshisha-purple-600')
  })

  it('highlights the active category when on a category page', () => {
    (usePathname as jest.Mock).mockReturnValue('/category/news')
    render(<Header />)
    
    const newsCategory = screen.getByText('ニュース').closest('a')
    expect(newsCategory).toHaveClass('text-doshisha-purple-600')
  })

  it('does not highlight inactive categories', () => {
    (usePathname as jest.Mock).mockReturnValue('/category/news')
    render(<Header />)
    
    const allCategory = screen.getByText('全て').closest('a')
    const columnCategory = screen.getByText('コラム').closest('a')
    
    expect(allCategory).not.toHaveClass('text-doshisha-purple-600')
    expect(columnCategory).not.toHaveClass('text-doshisha-purple-600')
  })

  it('renders category links with correct href attributes', () => {
    render(<Header />)
    
    const allLink = screen.getByText('全て').closest('a')
    const newsLink = screen.getByText('ニュース').closest('a')
    const columnLink = screen.getByText('コラム').closest('a')
    const interviewLink = screen.getByText('インタビュー').closest('a')
    const surveyLink = screen.getByText('アンケート企画').closest('a')
    
    expect(allLink).toHaveAttribute('href', '/')
    expect(newsLink).toHaveAttribute('href', '/category/news')
    expect(columnLink).toHaveAttribute('href', '/category/column')
    expect(interviewLink).toHaveAttribute('href', '/category/interview')
    expect(surveyLink).toHaveAttribute('href', '/category/survey')
  })
})