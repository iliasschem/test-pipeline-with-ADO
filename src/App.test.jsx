import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('renders the count button', () => {
    render(<App />)
    expect(screen.getAllByRole('button', { name: /count is 0/i })[0]).toBeInTheDocument()
  })


//   it('increments count on button click', async () => {
//     const user = userEvent.setup()
//     render(<App />)
//     const button = screen.getByRole('button', { name: /count is 0/i })
//     await user.click(button)
//     expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
//   })
})