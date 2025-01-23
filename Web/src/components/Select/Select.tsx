import { ChangeEvent } from 'react'
import styles from './Select.module.css'

type Option = {
    value: string | number 
    label: string
}

type SelectProps = {
    label: string 
    name: string
    value: string | number | null
    fnc: (e: ChangeEvent<HTMLSelectElement>) => void
    placeHolder?: string
    options: Option[]
}

export default function Select({ label, name, value, fnc, placeHolder = 'Seleccione', options = [] } : SelectProps) {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={name}>{label}</label>
            <select className={styles.select} onChange={fnc} name={name} id={name} value={value!}>
                <option value="0">{placeHolder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}
