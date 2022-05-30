open Hybrids

type viewOptions<'b, 'a> = { onChange: (. Descriptor.host<'b>, 'a) => unit }

let combine: Descriptor.d<'a, {..} as 'b> => Descriptor.d<'a, {..}> => Descriptor.d<'a, 'b>

let view: (. {..}, viewOptions<'b, 'a>) => Descriptor.d<array<{.."page": 'a}>, {..}>