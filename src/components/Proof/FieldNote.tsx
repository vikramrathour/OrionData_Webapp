interface Props {
  note: string
}

export default function FieldNote({ note }: Props) {
  return (
    <div className="my-3 rotate-[-0.5deg] border-l-2 border-trust/40 pl-3 md:absolute md:-right-4 md:top-4 md:w-52 md:rotate-[-1deg]">
      <p className="font-serif text-[12px] italic leading-relaxed text-trust/80">
        {note}
      </p>
    </div>
  )
}
