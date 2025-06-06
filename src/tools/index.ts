/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 返回一个随机整数
 */
export const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成指定范围内的随机 RGB 颜色
 * @param {number} min - 颜色通道的最小值
 * @param {number} max - 颜色通道的最大值
 * @returns {string} - 返回一个 RGB 颜色字符串，如 "rgb(100, 150, 200)"
 */
export const randomColor = (min: number, max: number) => {
    const r = randomNum(min, max); // 红色通道
    const g = randomNum(min, max); // 绿色通道
    const b = randomNum(min, max); // 蓝色通道
    return `rgb(${r},${g},${b})`;
}
