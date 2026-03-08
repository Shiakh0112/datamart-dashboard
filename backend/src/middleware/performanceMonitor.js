export const performanceMonitor = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${status} - ${duration}ms`);
    
    if (duration > 500) {
      console.warn(`⚠️ SLOW QUERY: ${req.method} ${req.url} took ${duration}ms`);
    }
    
    if (duration > 1000) {
      console.error(`❌ CRITICAL: ${req.method} ${req.url} took ${duration}ms`);
    }
  });
  
  next();
};
