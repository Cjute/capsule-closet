# Rêche Style Board

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

/**
 * DESIGN TOKENS — v3: 90s / early-2000s Vogue, supermodel-era editorial
 * Color:
 *   paper   #FAF8F4  — glossy magazine white, not sterile pure-white
 *   ink     #0A0A0A  — true print black, high contrast
 *   red     #C4122F  — the one hit of color: lipstick / masthead red
 *   grey    #8C8880  — captions, contact-sheet numbering
 *   line    #D8D3C8  — hairline rule
 * Motif: a fine film-grain overlay on every image block (the era's actual
 *   texture — shot on film, not digital) and a contact-sheet frame grid for
 *   the wardrobe, styled like negatives laid out on a lightbox.
 * Type:
 *   Display — "Bodoni Moda" — the real Vogue-masthead lineage: high-contrast,
 *   thick-thin strokes, a little haughty. Used large, used sparingly.
 *   Body/UI — "Inter" at tight tracking — the clean 90s minimalist grid voice.
 * Layout: tear-sheet grid, oversized masthead wordmark, thin rules, generous
 *   white space instead of packed panels — the opposite of a cluttered app.
 */

const fontLink = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500&display=swap";

const grain =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    ``
  );

const wardrobe = [
  { id: 1, name: "Cream wool blazer", tag: "outerwear", worn: 4 },
  { id: 2, name: "Washed grey tee", tag: "top", worn: 11 },
  { id: 3, name: "Straight-leg denim", tag: "bottom", worn: 9 },
  { id: 4, name: "Silk slip skirt", tag: "bottom", worn: 2 },
  { id: 5, name: "Leather loafers", tag: "shoes", worn: 7 },
  { id: 6, name: "Ribbed tank, ecru", tag: "top", worn: 6 },
];

const looks = [
  { id: "a", title: "Quiet Tuesday", pieces: ["Cream wool blazer", "Washed grey tee", "Straight-leg denim"] },
  { id: "b", title: "Off-duty, still sharp", pieces: ["Ribbed tank, ecru", "Silk slip skirt", "Leather loafers"] },
];

const secondhand = [
  { id: 1, name: "Wool-blend trench", material: "92% wool", price: "€38", source: "Sellpy" },
  { id: 2, name: "Cotton poplin shirt", material: "100% cotton", price: "€14", source: "Vinted" },
  { id: 3, name: "Leather belt, tan", material: "full-grain leather", price: "€19", source: "Sellpy" },
];

function Grain({ style }) {
  return (
    


  );
}

export default function AppPreview() {
  const [activeLook, setActiveLook] = useState(looks[0].id);
  const current = looks.find((l) => l.id === activeLook);

  return (
    


      

      {/* Masthead — the actual Vogue-lineage move: one huge Bodoni wordmark, nothing else competing */}
      


        


          


            RÊCHE
          


          
            WARDROBE
            LOOKS
            SECONDHAND
            BOARD
          
        


        


          THE CLOSET ISSUE
        


      



      {/* Hero — a tear-sheet: grained photo block against an oversized italic pull line */}
      


        


          
          
            FIG. 01
          
        


        


          


            FROM YOUR CLOSET, NOT A CART
          


          


            The girl who already owns it.
          


          


            Twelve pieces, forty combinations. Your board sets the mood — a little
            grain, a little attitude. Nothing here is a suggestion to buy.
          


        


      



      {/* Board-matched look */}
      


        


          {looks.map((l) => (
             setActiveLook(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0 14px",
                fontFamily: "Bodoni Moda, serif",
                fontSize: "20px",
                color: activeLook === l.id ? "#0A0A0A" : "#8C8880",
                borderBottom: activeLook === l.id ? "2px solid #C4122F" : "2px solid transparent",
              }}
            >
              {l.title}
            
          ))}
        



        


          


            
            
              rendered try-on
            
          


          


            


              MATCHED TO YOUR BOARD
            


            


              {current.pieces.map((p, i) => (
                


                  {p}
                  from your closet
                


              ))}
            


            
              SAVE THIS LOOK 
            
          


        


      



      {/* Wardrobe — styled as a contact sheet: numbered frames, not cards */}
      


        


          


            Neglected, not forgotten
          


          SORTED BY COST-PER-WEAR
        


        


          {wardrobe
            .sort((a, b) => a.worn - b.worn)
            .map((item) => (
              


                {String(item.id).padStart(2, "0")}
                {item.name}
                {item.tag.toUpperCase()}
                WORN {item.worn}×
              


            ))}
        


        
           ADD A PIECE
        
      



      {/* Secondhand */}
      


        


          Fills the gaps, secondhand
        


        


          Only natural fibers make this list. No polyester, no acrylic — just the pieces
          your wardrobe is actually missing.
        


        


          {secondhand.map((item) => (
            


              

{item.name}


              

{item.material.toUpperCase()}


              

{item.price} · {item.source}


            


          ))}
        


      



      


        RÊCHE
        YOUR CLOSET, ALREADY ICONIC
      


    


  );
}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/25dbbcb9-8c67-4ed3-bd25-a78201067a84).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
