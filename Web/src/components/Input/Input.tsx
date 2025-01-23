import { ChangeEvent } from 'react'
import styles from './Input.module.css'

type InputProps = {
    type?: 'text' | 'number'
    label: string 
    name: string
    value: string | number
    fnc: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
    placeholder?: string
}

export default function Input({ type = 'text', label, name, value, fnc, className, placeholder } : InputProps) {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input placeholder={placeholder} onChange={fnc} className={styles.input} type={type} value={value} name={name} id={name} />
        </div>
    )
}
