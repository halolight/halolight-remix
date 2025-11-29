// 处理所有未匹配的路由
export async function loader() {
  // 忽略 .well-known 等系统请求
  return new Response("Not Found", { status: 404 });
}

export default function CatchAll() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">页面未找到</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
