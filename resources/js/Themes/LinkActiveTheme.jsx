export function LinkActiveTheme(routeName) {
    const className = `${route().current(routeName) ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`

    return className;
}