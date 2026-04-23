export default function GoldDivider() {
  return (
    <div className="relative w-full py-1">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#C9A84C] opacity-60" />
    </div>
  )
}