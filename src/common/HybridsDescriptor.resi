open Hybrids

type viewOptions<'a> = { onChange: (. 'a) => unit }

let combine: Descriptor.d<'a, {..} as 'b> => Descriptor.d<'a, {..}> => Descriptor.d<'a, 'b>

let view: (. {..}, viewOptions<'a>) => Descriptor.d<array<{.."page": 'a}>, {..}>