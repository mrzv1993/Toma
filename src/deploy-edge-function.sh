#!/bin/bash

# Toma Edge Function Deployment Script
# This script deploys the Edge Function to Supabase

set -e

echo "======================================"
echo "🚀 Deploying Toma Edge Function"
echo "======================================"
echo ""

PROJECT_REF="gyeavjcumghuiblzjwnx"
FUNCTION_NAME="server"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    echo "Install it with:"
    echo "  npm install -g supabase"
    echo ""
    echo "Or using Homebrew (macOS):"
    echo "  brew install supabase/tap/supabase"
    echo ""
    exit 1
fi

echo "✅ Supabase CLI found"
SUPABASE_VERSION=$(supabase --version)
echo "   Version: $SUPABASE_VERSION"
echo ""

# Check if user is logged in
echo "🔐 Checking authentication..."
if ! supabase projects list &> /dev/null; then
    echo "❌ Not logged in to Supabase."
    echo ""
    echo "Please login first:"
    echo "  supabase login"
    echo ""
    echo "This will open a browser window to authenticate."
    exit 1
fi

echo "✅ Authenticated"
echo ""

# Verify project exists
echo "🔍 Verifying project access..."
if ! supabase projects list | grep -q "$PROJECT_REF"; then
    echo "⚠️  Warning: Project $PROJECT_REF not found in your projects list"
    echo "   Continuing anyway - you might not have access or CLI might be outdated"
    echo ""
fi

# Check if function directory exists
if [ ! -d "supabase/functions/$FUNCTION_NAME" ]; then
    echo "❌ Function directory not found: supabase/functions/$FUNCTION_NAME"
    echo "   Current directory: $(pwd)"
    echo "   Please run this script from the project root"
    exit 1
fi

echo "✅ Function directory found"
echo ""

# Check if index.tsx exists
if [ ! -f "supabase/functions/$FUNCTION_NAME/index.tsx" ]; then
    echo "❌ Function entry point not found: supabase/functions/$FUNCTION_NAME/index.tsx"
    exit 1
fi

echo "✅ Function entry point found"
echo ""

# Show function info
echo "📦 Function Information:"
echo "   Name: $FUNCTION_NAME"
echo "   Path: supabase/functions/$FUNCTION_NAME"
echo "   Entry: index.tsx"
FUNCTION_SIZE=$(du -sh supabase/functions/$FUNCTION_NAME | cut -f1)
echo "   Size: $FUNCTION_SIZE"
echo ""

# Deploy the function
echo "🚀 Deploying function '$FUNCTION_NAME' to project '$PROJECT_REF'..."
echo ""
echo "This may take 30-60 seconds..."
echo ""

if supabase functions deploy ${FUNCTION_NAME} --project-ref ${PROJECT_REF} --no-verify-jwt; then
    echo ""
    echo "======================================"
    echo "✅ Deployment Successful!"
    echo "======================================"
    echo ""
    
    # Test the deployment
    echo "🧪 Testing deployment..."
    HEALTH_URL="https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/health"
    
    echo "   Testing: $HEALTH_URL"
    
    # Wait a bit for function to be ready
    sleep 3
    
    if HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$HEALTH_URL" 2>/dev/null); then
        HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
        RESPONSE_BODY=$(echo "$HEALTH_RESPONSE" | head -n-1)
        
        if [ "$HTTP_CODE" = "200" ]; then
            echo "   ✅ Health check passed!"
            echo "   Response: $RESPONSE_BODY"
        else
            echo "   ⚠️  Health check returned HTTP $HTTP_CODE"
            echo "   Response: $RESPONSE_BODY"
            echo ""
            echo "The function is deployed but might need a moment to start."
            echo "Try again in 10-15 seconds."
        fi
    else
        echo "   ⚠️  Could not reach health endpoint (this is normal, might need a moment)"
    fi
    
    echo ""
    echo "📍 Endpoints:"
    echo "   • Health: https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/health"
    echo "   • Ping:   https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/ping"
    echo "   • Root:   https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/"
    echo ""
    echo "📊 View logs:"
    echo "   supabase functions logs ${FUNCTION_NAME} --project-ref ${PROJECT_REF} --follow"
    echo ""
    echo "🌐 Next steps:"
    echo "   1. Open https://tommma.ru in your browser"
    echo "   2. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)"
    echo "   3. Check console (F12) - should see: ✅ Server health check passed"
    echo "   4. The red error banner should disappear"
    echo ""
else
    echo ""
    echo "======================================"
    echo "❌ Deployment Failed"
    echo "======================================"
    echo ""
    echo "Common issues:"
    echo "   1. Not logged in: supabase login"
    echo "   2. Wrong project ref: check Supabase dashboard"
    echo "   3. Syntax errors in code: check supabase/functions/server/index.tsx"
    echo "   4. Missing dependencies: check imports in code"
    echo ""
    echo "📖 See detailed instructions in /DEPLOY_NOW.md"
    echo ""
    exit 1
fi