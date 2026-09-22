import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET(request: NextRequest) {
  try {
    const auth = request.cookies.get('auth')?.value
    const [userId, workspaceId] = auth?.split(':') || ['', '']

    const { data, error } = await supabase.from('transactions').insert({
      workspace_id: workspaceId,
      type: 'expense',
      amount: 99.99,
      description: 'TEST',
      category: 'Teste',
      transaction_date: '2026-09-10',
      created_by: userId,
    }).select()

    const { data: check } = await supabase
      .from('transactions')
      .select('*')
      .eq('workspace_id', workspaceId)
      .limit(1)

    return NextResponse.json({
      insert_error: error,
      insert_data: data,
      check_result: check,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
