const loadedIcons = new Set<string>();
const loadingIcons = new Map<string, Promise<void>>();

export async function loadSvgIcon(name: string) {
  // 已加载
  if (loadedIcons.has(name)) return;

  // 正在加载（解决 StrictMode / 并发）
  if (loadingIcons.has(name)) {
    return loadingIcons.get(name);
  }

  const task = (async () => {
    // 再兜底一次 DOM（防止热更新等）
    if (document.getElementById(`icon-${name}`)) {
      loadedIcons.add(name);
      return;
    }

    const mod = await import(`../assets/svg/${name}.svg?raw`);

    const container = document.createElement('div');
    container.innerHTML = mod.default;

    const svgEl = container.querySelector('svg');
    if (!svgEl) return;

    const path = svgEl.querySelector('path');
    if (!path) return;

    path.setAttribute('fill', 'currentColor');

    const symbol = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'symbol'
    );

    const viewBox = svgEl.getAttribute('viewBox');
    if (!viewBox) {
      console.warn(`[svg-icon] ${name} missing viewBox`);
      return;
    }
    symbol.setAttribute('id', `icon-${name}`);
    symbol.setAttribute('viewBox', viewBox);
    symbol.setAttribute('aria-hidden', 'true');

    symbol.appendChild(path);

    let sprite = document.getElementById('__svg_sprite__') as SVGSVGElement | null;
    if (!sprite) {
      sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      sprite.setAttribute('id', '__svg_sprite__');
      sprite.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      sprite.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      sprite.setAttribute(
        'style',
        'position:absolute;width:0;height:0;overflow:hidden'
      );
      document.body.appendChild(sprite);
    }

    sprite.appendChild(symbol);
    loadedIcons.add(name);
  })();

  loadingIcons.set(name, task);
  await task;
  loadingIcons.delete(name);
}