import barlowBold from '../assets/fonts/BarlowCondensed-Bold.ttf';
import barlowExtraBold from '../assets/fonts/BarlowCondensed-ExtraBold.ttf';
import dmSansRegular from '../assets/fonts/DMSans-Regular.ttf';
import dmSansMedium from '../assets/fonts/DMSans-Medium.ttf';
import dmSansBold from '../assets/fonts/DMSans-Bold.ttf';

/**
 * Web counterpart of react-native-asset: registers the same TTF files under
 * the same names the tokens use (the PostScript name), so every `fontFamily`
 * string works unchanged on iOS, Android and web.
 */
const FACES: Record<string, string> = {
  'BarlowCondensed-Bold': barlowBold,
  'BarlowCondensed-ExtraBold': barlowExtraBold,
  'DMSans-Regular': dmSansRegular,
  'DMSans-Medium': dmSansMedium,
  'DMSans-Bold': dmSansBold,
};

export function installFonts() {
  const css = Object.entries(FACES)
    .map(
      ([family, url]) =>
        `@font-face{font-family:'${family}';src:url('${url}') format('truetype');font-display:swap;}`,
    )
    .join('\n');
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
