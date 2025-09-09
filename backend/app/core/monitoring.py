from prometheus_client import Counter, Histogram, generate_latest
from fastapi import Response

REQUEST_COUNT = Counter(
    'request_count', 'App Request Count',
    ['app_name', 'method', 'endpoint', 'http_status']
)

REQUEST_LATENCY = Histogram(
    'request_latency_seconds', 'Request latency',
    ['app_name', 'endpoint']
)

async def monitor_requests(request, call_next):
    with REQUEST_LATENCY.labels('marketing_api', request.url.path).time():
        response = await call_next(request)
        REQUEST_COUNT.labels(
            'marketing_api', request.method, request.url.path, response.status_code
        ).inc()
    return response

def metrics_endpoint():
    return Response(generate_latest())