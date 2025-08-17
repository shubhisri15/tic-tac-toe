import { useState } from "react"

export default function BoardSizeForm({ onSetBoardSize }: { onSetBoardSize: (size: number) => void }) {
    const [inputValue, setInputValue] = useState(3) 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSetBoardSize(inputValue) 
    }

    return (
        <div className='board-size'>
            <h2>Set Board Size</h2>
            <form className='bs-form-input' onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    min="2" 
                    max="10" 
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
