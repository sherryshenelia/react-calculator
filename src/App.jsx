import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const equals = () => {
    if (!previousValue || !operation) return

    const inputValue = parseFloat(display)
    const newValue = calculate(previousValue, inputValue, operation)

    setDisplay(String(newValue))
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const percentage = () => {
    const currentValue = parseFloat(display)
    const newValue = currentValue / 100
    setDisplay(String(newValue))
  }

  const plusMinus = () => {
    const currentValue = parseFloat(display)
    const newValue = -currentValue
    setDisplay(String(newValue))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>React Calculator</h1>
        <p className="subheader">A modern, responsive calculator built with React</p>
      </header>
      
      <div className="calculator-container">
        <div className="calculator">
          <div className="display">{display}</div>
          <div className="buttons">
            <button className="button clear" onClick={clear}>AC</button>
            <button className="button operator" onClick={plusMinus}>±</button>
            <button className="button operator" onClick={percentage}>%</button>
            <button className="button operator" onClick={() => performOperation('÷')}>÷</button>
            
            <button className="button number" onClick={() => inputDigit(7)}>7</button>
            <button className="button number" onClick={() => inputDigit(8)}>8</button>
            <button className="button number" onClick={() => inputDigit(9)}>9</button>
            <button className="button operator" onClick={() => performOperation('×')}>×</button>
            
            <button className="button number" onClick={() => inputDigit(4)}>4</button>
            <button className="button number" onClick={() => inputDigit(5)}>5</button>
            <button className="button number" onClick={() => inputDigit(6)}>6</button>
            <button className="button operator" onClick={() => performOperation('-')}>-</button>
            
            <button className="button number" onClick={() => inputDigit(1)}>1</button>
            <button className="button number" onClick={() => inputDigit(2)}>2</button>
            <button className="button number" onClick={() => inputDigit(3)}>3</button>
            <button className="button operator" onClick={() => performOperation('+')}>+</button>
            
            <button className="button number zero" onClick={() => inputDigit(0)}>0</button>
            <button className="button number" onClick={inputDecimal}>.</button>
            <button className="button operator equals" onClick={equals}>=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
