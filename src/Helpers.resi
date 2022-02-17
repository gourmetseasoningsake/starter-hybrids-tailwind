let unsafeProp: Js.Dict.t<'a> => string => 'a

let descriptorCombine: Hybrids.Descriptor.d<'a, {..} as 'b> => {..} => Hybrids.Descriptor.d<'a, 'b>

let descriptorCombineWithRouter: {..} => {..} => Hybrids.Descriptor.d<'a, {..}>