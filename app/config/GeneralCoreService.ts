import axiosInstance from "./axiosInstance";


export const GeneralCoreService = (formName?: string) => {

    return {
        GetAll: async (payload?: any,id?: number) => {

            try {
                const response = await axiosInstance.get(`/${formName}/${id ? id : ''}`, { ...payload });
                return { data: response?.data, status: response.status }

            } catch (err: any) {
                return {
                    success: false,
                    message: err?.response?.data?.message || 'Unknown error',
                };
            }
        },
        Save: async (payload: any, id?: any) => {
            if (id) {
                try {
                    const response = await axiosInstance.put(`/${formName}/${id ? id : ''}`, { ...payload });
                    return { ...response?.data, status: response.status }

                } catch (err: any) {
                    return {
                        success: false,
                        message: err?.response?.data?.message || 'Unknown error',
                    };
                }
            } else {

                try {

                    const response = await axiosInstance.post(`/${formName}`, { ...payload });
                    return { ...response?.data, status: response?.status }

                } catch (err: any) {
                    return {
                        success: false,
                        message: err?.response?.data?.message || 'Unknown error',
                    };
                }
            }

        },
        Lookup: async (formname: any) => {
            try {
                const response = await axiosInstance.get(`/lookup/?lookupname=${formname}`);
                return { ...response?.data, status: response.status }

            } catch (err: any) {
                return {
                    success: false,
                    message: err?.response?.data?.message || 'Unknown error',
                };
            }
        },
        Delete: async (id: any) => {
            try {

                const response = await axiosInstance.delete(`/${formName}/${id}`);
                return { ...response?.data, status: response.status }

            } catch (err: any) {
                return {
                    success: false,
                    message: err?.response?.data?.message || 'Unknown error',
                };
            }

        }
    };
};
