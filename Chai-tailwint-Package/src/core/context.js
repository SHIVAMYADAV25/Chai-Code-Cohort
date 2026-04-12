export const context = {
  plugins: []
};

export function registerPlugin(plugin) {
  context.plugins.push(plugin);
}