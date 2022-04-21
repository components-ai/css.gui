export interface NumberInputProps {
  value: any
  onChange: (newNumber: number) => void
  id?: string
  step?: number
  property?: string
  min?: number
  max?: number
}
