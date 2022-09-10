import Link from 'next/link';
import Zoom from 'next-image-zoom';
import luminaceHueDark from 'public/images/luminance-vs-hue-dark.webp';
import luminaceHueLight from 'public/images/luminance-vs-hue-light.webp';
import saturationHueDark from 'public/images/saturation-vs-hue-dark.webp';
import saturationHueLight from 'public/images/saturation-vs-hue-light.webp';

export const AboutComponent = () => {
  return (
    <article className='prose prose-stone mx-auto dark:prose-invert md:prose-lg'>
      <h2 id='simple-ui-generator'>
        This is a &apos;simple&apos; color UI generator
      </h2>
      <p>
        This is a &apos;simple&apos; color UI generator with complex algorithms
        to generate the colors that feels natural and harmonious. It
        doesn&apos;t just generate color steps using luminosity alone, instead
        it uses a combination of hue, saturation, and luminosity to generate the
        color steps. <br />
        What to know more? Go to the{' '}
        <Link href='#how-it-works'>How It Works</Link> section.
      </p>
      <ul>
        <li>
          It generates 3 color palettes based on primary, secondary and tertiary
          colors.
        </li>
        <li>
          It generates a gray scale color palette based on the primary color.
        </li>
        <li>
          It generates 6 analogous & monochromatic color palettes based on the
          primary color.
        </li>
        <li>
          It also generates a few more analogous color palettes based on the
          primary, secondary and tertiary colors.
        </li>
      </ul>
      <h2 id='features'>Features</h2>
      <ul>
        <li>Mordern & minimal UI design</li>
        <li>Live preview colors with preset components</li>
        <li>View colors in hex, rgb, hsl, lab and lch</li>
        <li>
          Copy colors as <strong>Tailwind Config</strong> and{' '}
          <strong>CSS variables</strong>
        </li>
        <li>
          Ability to generate color palettes, analogous & monochromatic colors
          from primary, secondary & tertiary colors
        </li>
        <li>
          Save the entire UI as png, you can then use it as a color template for
          your UI designs
        </li>
        <li>Copy individual colors to clipboard</li>
        <li>Fully mobile friendly</li>
        <li>Supports light/Dark mode</li>
      </ul>
      <h2 id='how-to-use'>How to use</h2>
      <p>
        The easiest way is to click the &apos;Dice&apos; button on the top left,
        it will generate a random color palette for you. You can also enter the
        primary, secondary and tertiary colors by clicking on the color boxes.
      </p>
      <p>
        You can copy individual colors by clicking on the color box. Or you can
        copy the entire color palette by clicking on the &apos;Copy&apos; button
        either in the <strong>Tailwind</strong> or <strong>CSS</strong> tab.
      </p>
      <h2 id='why'>Why?</h2>
      <p>
        I was looking for a tool that would generate color palettes for me and
        found this{' '}
        <a href='https://color.adobe.com/create/color-wheel'>color wheel</a> on
        adobe. It was great but I wanted to be able to save the entire UI as a
        png file so I could use it as a color template for my UI designs. I also
        wanted to be able to copy individual colors to clipboard.
      </p>
      <p>
        But I wanted to do it even better. So I set back and studied hard on how
        &apos;color&apos; reacts with different elements on the web, and how the
        &apos;hue&apos; plays a role in terms of the hierarchy in relation to
        the luminosity and saturation. As a result, I have converted what seems
        like &apos;artistic&apos; choices into robost math that can represent
        the &apos;true&apos; color value steps.
      </p>
      <h2 id='how-it-works' className='scroll-my-6'>
        How it works?
      </h2>
      <p>
        It starts by manually picking main colors in different hues, for
        example: Red, Orange, Yellow, Lime Green, Green, Teal, Cyan, Light Blue,
        Blue, Indigo, Purple, Magenta, and Pink. The good news is I am not the
        judge of what each color looks the best, instead, I converted all
        TailwindCSS color palettes (HSL) and input their saturation and
        luminosity values into two seperate charts.
      </p>
      <figure>
        <div className='dark:hidden'>
          <Zoom
            src={luminaceHueLight}
            alt='Luminosity vs Hue'
            layout='responsive'
            className='cursor-zoom-in'
          />
        </div>
        <div className='hidden dark:block [&>div]:dark:!bg-black/70'>
          <Zoom
            src={luminaceHueDark}
            alt='Luminosity vs Hue'
            layout='responsive'
            className='cursor-zoom-in'
          />
        </div>
        <figcaption>
          <p>
            <strong>Luminosity vs Hue</strong>
          </p>
          <p>
            We see that most colors have a linear progression in terms of
            luminosity, but yellow rises up in the 300-600 range, this is
            becuase that yellow is the brightest color in the spectrum. And it
            needs more lightness to be visible combined with saturation in those
            ranges.
          </p>
          <p>
            Colors ranges from cyan to red (180-360) tend to have a higher
            luminosity than colors in the range of green to blue (0-180). This
            is because the human eye is more sensitive to yellow-green, which
            makes sense to increase the lightness of the other colors to match
            the &apos;feel&apos;.
          </p>
        </figcaption>
      </figure>
      <p>Next, let&apos;s analyze the saturation vs hue chart.</p>
      <figure>
        <div className='dark:hidden'>
          <Zoom
            src={saturationHueLight}
            alt='Saturation vs Hue'
            layout='responsive'
            className='cursor-zoom-in'
          />
        </div>
        <div className='hidden dark:block [&>div]:dark:!bg-black/70'>
          <Zoom
            src={saturationHueDark}
            alt='Saturation vs Hue'
            layout='responsive'
            className='cursor-zoom-in'
          />
        </div>
        <figcaption>
          <p>
            <strong>Saturation vs Hue</strong>
          </p>
          <p>
            We see that yellow and orange oftenly have a higher saturation in
            the step 400-700 range. And blue, purple, magenta, and green have a
            lower saturation accross the chart.
          </p>
        </figcaption>
      </figure>
      <p>
        As a result, we can then calculate color values using quatric equations,
        eg. color orange, where `x` is the given hue that is in range of orange
        hue 22.
        <pre>
          y = 0.002x^6 - 0.0695x^5 + 0.8757x^4 - 4.9266x^3 + 12.94x^2 - 17.593x
          + 91.633
        </pre>
      </p>
      <p>
        But it doesn&apos;t stop there, because these formulas are might not
        represent the values of the given hue exactly, we need to make a
        function that determines the closest two colors that we manually set.
      </p>
      <p>
        Say the user chose a color of hue <strong>18</strong>, we can extract
        the hue from the color: 18. And in our manual color sets, 18 lies
        between red (15) and orange (31). So we can use the formula to calculate
        the ratio between red and orage:
        <pre>ratio = (18 - 15) / (31 - 15) = 0.3</pre>
        Then we can use the ratio to calculate the luminosity and saturation of
        the color using formulas for steps between 50 - 900 (where x is the step
        count):
        <pre>
          saturation_red_step_1 = 0.0076x^6 - 0.2422x^5 + 2.9831x^4 - 17.638x^3
          + 52.063x^2 - 77.927x + 132.83 = 92.0765 <br />
          saturation_orange_step_1 = 0.002x^6 - 0.0695x^5 + 0.8757x^4 -
          4.9266x^3 + 12.94x^2 - 17.593x + 91.633 = 82.8616
        </pre>
        Then we can calculate the saturation of the color using the ratio:
        <pre>
          saturation = saturation_red_step_1 * ratio + saturation_orange_step_1
          * (1 - ratio) = 92.0765 * 0.3 + 82.8616 * 0.7 = 88.201
        </pre>
        Same concept applies to luminosity. Lastly, based on user&apos;s input
        of the saturation and luminosity, we can convert them as a factor and
        multiply them with the calculated saturation and luminosity to get the
        final color steps. For example, if a user chose a color hue 18 with 40%
        saturation, we can then calculate the computed saturation for value step
        50 as:
        <pre>saturation = 40 * 88.201 / 100 = 35.2804</pre>
      </p>
      <h2 id='how-to-contribute'>How to contribute?</h2>
      <p>
        You can contribute to this project by reporting bugs, suggesting
        improvements or by forking the repo and sending a pull request.
      </p>
      <h2>License</h2>
      <p>This project is licensed under the MIT License</p>
    </article>
  );
};
