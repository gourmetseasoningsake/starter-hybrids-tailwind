import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './tailwind.config.cjs'



export const defaults = {
  plugins: [ 
    tailwind(tailwindConfig),
    autoprefixer
  ],
}
