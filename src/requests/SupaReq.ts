// 使用supabase
// 定义GetAllList请求
import supabase from "./SupaConnect";

export const getList = async (
    tableName: string,
    columns: string = '*',
    page: number = 0,
    pageSize: number = 0,
    filters: Record<string, any> = {}
) => {
    try {
        // 选取表和列
        let query = supabase.from(tableName).select(columns)
        // 添加筛选条件
        for (const [key, value] of Object.entries(filters)) {
            query = query.like(key, '%' + value + '%')
        }
        // 添加分页选项
        if (page != 0 && pageSize != 0){
            query = query.range((page - 1) * pageSize, page * pageSize - 1)
        }
        // 执行
        const { data, error } = await query
        if (error) throw new Error(`Error fetching data: ${error.message}`)
        return data
    } catch (error) {
        console.error(`Error fetching data from ${tableName}:`, error)
        return null
    }
}

export const insertData = async (table: string,dataList: any[]) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .insert(dataList)
            .select()
        if (error) throw new Error(`Error inserting data: ${error.message}`)
        return data
    } catch (error) {
        console.error('Error inserting data:', error)
        return null
    }
}

export const deleteData = async (table: string, id: string) => {
    try {
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', id)
        if (error) throw new Error(`Error deleting data: ${error.message}`)
        return true
    } catch (error) {
        console.error('Error deleting data:', error)
        return false
    }
}

export const updateData = async (table: string, id: string, dataList: any[]) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .update(dataList)
            .eq('id', id)
            .select()
        if (error) throw new Error(`Error updating data: ${error.message}`)
        return data
    } catch (error) {
        console.error('Error updating data:', error)
        return null
    }
}
