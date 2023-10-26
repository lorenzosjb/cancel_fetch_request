import { useCounter } from '@/hooks/counter'

type HelloProps = {
  greet?: string,
  count: number
}

export default function Hello({ greet = 'babe', count}: HelloProps) {
  const { multiplyByTen } = useCounter(count);
  return (
    <div>
      Hello {greet} {multiplyByTen}
    </div>
  )
}
