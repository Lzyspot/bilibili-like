// src/utils/websocket.js

/**
 * WebSocket客户端类
 * 提供WebSocket连接管理、自动重连、事件监听等功能
 */
class WebSocketClient {
  url: string;
  ws: WebSocket | null;
  reconnectInterval: number;
  maxReconnectAttempts: number;
  reconnectAttempts: number;
  isConnected: boolean;
  messageCallbacks: Array<(data: any) => void>;
  openCallbacks: Array<() => void>;
  closeCallbacks: Array<(event: CloseEvent) => void>;

  /**
   * 构造函数
   * @param url - WebSocket服务器地址
   */
  constructor(url: string) {
    this.url = url;
    this.ws = null;
    this.reconnectInterval = 3000; // 重连间隔（毫秒）
    this.maxReconnectAttempts = 10; // 最大重连尝试次数
    this.reconnectAttempts = 0; // 当前重连尝试次数
    this.isConnected = false; // 连接状态标识

    // 存储监听器
    this.messageCallbacks = []; // 消息回调函数数组
    this.openCallbacks = []; // 连接打开回调函数数组
    this.closeCallbacks = []; // 连接关闭回调函数数组

    this.connect();
  }

  /**
   * 建立WebSocket连接
   */
  connect() {
    // ✅ 可在此加入 Token 认证（如 URL 参数）
    const token = localStorage.getItem('token'); // 或从 Vuex/Pinia 获取
    const url = token ? `${this.url}?token=${token}` : this.url;

    this.ws = new WebSocket(url);

    // 连接成功事件处理
    this.ws.onopen = () => {
      console.log('✅ WebSocket 已连接');
      this.isConnected = true;
      this.reconnectAttempts = 0; // 重置重连计数
      this.openCallbacks.forEach(cb => cb());
    };

    // 接收消息事件处理
    this.ws.onmessage = (event: MessageEvent) => {
      let data: any;
      try {
        data = JSON.parse(event.data); // 假设后端发的是 JSON
      } catch (e) {
        data = event.data; // 不是 JSON 就原样返回
      }
      this.messageCallbacks.forEach(cb => cb(data));
    };

    // 连接关闭事件处理
    this.ws.onclose = (event: CloseEvent) => {
      console.log('❌ WebSocket 已关闭', event);
      this.isConnected = false;
      this.closeCallbacks.forEach(cb => cb(event));

      // 自动重连（如果不是正常关闭）
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        console.log(`🔁 正在尝试第 ${this.reconnectAttempts} 次重连...`);
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };

    // 错误事件处理
    this.ws.onerror = (error: Event) => {
      console.error('WebSocket 错误:', error);
    };
  }

  /**
   * 发送消息到服务器
   * @param data - 要发送的数据
   */
  send(data: any) {
    if (this.isConnected && this.ws && this.ws.readyState === WebSocket.OPEN) {
      const payload = typeof data === 'object' ? JSON.stringify(data) : data;
      this.ws.send(payload);
    } else {
      console.warn('WebSocket 未连接，发送失败', data);
    }
  }

  /**
   * 注册消息监听器
   * @param callback - 消息回调函数
   * @returns this - 支持链式调用
   */
  onMessage(callback: (data: any) => void) {
    this.messageCallbacks.push(callback);
    return this; // 支持链式调用
  }

  /**
   * 注册连接打开监听器
   * @param callback - 连接打开回调函数
   * @returns this - 支持链式调用
   */
  onOpen(callback: () => void) {
    this.openCallbacks.push(callback);
    return this;
  }

  /**
   * 注册连接关闭监听器
   * @param callback - 连接关闭回调函数
   * @returns this - 支持链式调用
   */
  onClose(callback: (event: CloseEvent) => void) {
    this.closeCallbacks.push(callback);
    return this;
  }

  /**
   * 移除消息监听器
   * @param callback - 要移除的消息回调函数
   */
  removeOnMessage(callback: (data: any) => void) {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  /**
   * 主动关闭WebSocket连接
   * @param code - 关闭状态码，默认为1000（正常关闭）
   * @param reason - 关闭原因
   */
  close(code = 1000, reason?: string) {
    if (this.ws) {
      this.ws.close(code, reason);
    }
  }
}

// 创建WebSocket客户端实例
const wsClient = new WebSocketClient('ws://localhost:6600/ws');

export default wsClient;