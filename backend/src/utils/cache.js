class Cache {
  constructor(ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    console.log(`✅ Cache HIT: ${key}`);
    return item.data;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    console.log(`📦 Cache SET: ${key}`);
  }

  clear() {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }

  size() {
    return this.cache.size;
  }
}

export const cache = new Cache();
