import * as React from 'react'
import { Counter } from "./Counter";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'


describe('Counter', () => {
  test('should render with 0', () => {
    const result = render(<Counter/>)    
    expect(result.getByText('0')).toBeDefined()
  })
  test('should render with 1', () => {
    const result = render(<Counter initialCount={1}/>)    
    expect(result.getByText('1')).toBeDefined()
  })
  test('should increase', () => {
    const result = render(<Counter/>)
    fireEvent.click(screen.getByText('+'))
    expect(result.getByText('1')).toBeDefined()
  })
  test('should decrease', () => {
    const result = render(<Counter/>)
    fireEvent.click(screen.getByText('+'))
    expect(result.getByText('1')).toBeDefined()
  })
})