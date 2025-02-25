// 使用supabase
import supabase from "./SupaConnect";
import {USER_ID_KEY} from "@/utils/clerkUser";

interface GetListParams {
    tableName: string;
    columns?: string;
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
}

export const getList = async ({
                                  tableName,
                                  columns = '*',
                                  page = 0,
                                  pageSize = 0,
                                  filters = {},
                              }: GetListParams) => {
    try {
        console.log(filters)
        // 选取表和列
        let query = supabase.from(tableName).select(columns)
        // 获取 user_id
        const userId = localStorage.getItem(USER_ID_KEY);
        // 添加模糊查询条件（必须存在）
        for (const [key, value] of Object.entries(filters)) {
            if (typeof value === 'boolean') {
                query = query.eq(key, value); // 布尔类型使用 eq
            } else {
                query = query.like(key, '%' + value + '%'); // 字符串类型使用 like
            }
        }
        // 添加 user_id 或 level 的条件
        query = query.or(`user_id.eq.${userId},level.eq.0`);
        // 添加分页选项
        if (page != 0 && pageSize != 0) {
            query = query.range((page - 1) * pageSize, page * pageSize - 1)
        }
        // 执行
        const {data, error} = await query
        if (error) throw new Error(`Error fetching data: ${error.message}`)
        return data
    } catch (error) {
        console.error(`Error fetching data from ${tableName}:`, error)
        return null
    }
}

export const insertData = async (table: string, dataList: any[]) => {
    dataList.forEach(data => {
        data.user_id = localStorage.getItem(USER_ID_KEY)
        data.level = "1"
    })
    try {
        const {data, error} = await supabase
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
        const {error} = await supabase
            .from(table)
            .delete()
            .eq('id', id)
            .eq('user_id', localStorage.getItem(USER_ID_KEY))
        if (error) throw new Error(`Error deleting data: ${error.message}`)
        return true
    } catch (error) {
        console.error('Error deleting data:', error)
        return false
    }
}

export const updateData = async (table: string, id: string, dataList: any) => {
    try {
        const {data, error} = await supabase
            .from(table)
            .update(dataList)
            .eq('id', id)
            .eq('user_id', localStorage.getItem(USER_ID_KEY))
            .select()
        if (error) throw new Error(`Error updating data: ${error.message}`)
        return data
    } catch (error) {
        console.error('Error updating data:', error)
        return null
    }
}
