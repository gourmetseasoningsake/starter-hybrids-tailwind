let descriptorCombine: Hybrids.Descriptor.d<'a, {..} as 'b> => {..} => Hybrids.Descriptor.d<'a, 'b>

let descriptorCombineWithRouter: {..} => {..} => Hybrids.Descriptor.d<'a, {..}>

let getJsonOr: (. string, Js.Json.t) => Promise.t<Js.Json.t>