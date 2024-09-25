/**
 * @description 消息提示
 * @param { string } message 消息内容
 * @param { number } time 消息显示时间
 * @param { 'warning' | 'error' | 'success' } type 消息类型
 */
const Message = (message: string, time: number, type: 'warning' | 'error' | 'success' = 'error') => {
  const typeStyle = generateTypeStyle(type);
  const messageNode = document.createElement('div');
  messageNode.className = 'error-message';
  messageNode.innerText = message;
  messageNode.style.backgroundColor = typeStyle.backgroundColor;
  messageNode.style.color = typeStyle.color;
  document.body.appendChild(messageNode);
  const showTimer = setTimeout(() => {
    messageNode.className = 'error-message-show';
    clearTimeout(showTimer);
  }, 100);
  const transitionTimer = setTimeout(() => {
    messageNode.className = 'error-message';
    clearTimeout(transitionTimer);
  }, time);

  const removeTimer = setTimeout(() => {
    document.body.removeChild(messageNode);
    clearTimeout(removeTimer);
  }, time + 500);
};

const generateTypeStyle = (type: 'warning' | 'error' | 'success') => {
  switch (type) {
    case 'warning':
      return {
        backgroundColor: '#d18924',
        color: '#f5eada'
      };
    case 'error':
      return {
        backgroundColor: '#9c0d0d',
        color: '#e2baba'
      };
    case 'success':
      return {
        backgroundColor: '#047e04',
        color: '#ccf0cd'
      };
    default:
      return {
        backgroundColor: '#9c0d0d',
        color: '#e2baba'
      };
  }
};

export { Message };
