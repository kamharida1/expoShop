import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/UserProvider';
import { InsertTables, Tables, UpdateTables } from '@/types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export const useAdminAddressList = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    //refetchOnWindowFocus: false,
  });
}

export const useGetSelectedAddress = () => { 
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['addresses', { userId }],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .eq('is_selected', true)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    //refetchOnWindowFocus: false,
  });   
}

export const useAddress = (id: string) => { 
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyAddressList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['addresses', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    //refetchOnWindowFocus: false,
  });
};

export const useInsertAddress = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<'addresses'>) {
      const { error, data: newAddress } = await supabase
        .from('addresses')
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newAddress;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['addresses']});
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedAddress } = await supabase
        .from('addresses')
        .update({
          ...data,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedAddress;
    },
    async onSuccess(_, { id, updatedFields }) {
      await queryClient.invalidateQueries({queryKey: ['addresses']});
      await queryClient.invalidateQueries({queryKey: ['addresses', id]});
      await queryClient.setQueryData(['addresses', id], (oldData: any) => { 
        oldData ? {...oldData, updatedFields} : oldData 
      })
    },
  });
};

export const useSelectAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      // Update all addresses to set is_selected to false
      await supabase.from('addresses').update({ is_selected: false });

      // Set the selected address to is_selected: true
      const { error, data: updatedAddress } = await supabase
        .from('addresses')
        .update({is_selected: true})
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedAddress;
    },
    async onSuccess(_, id) {
      await queryClient.invalidateQueries({queryKey: ['addresses']});
      await queryClient.invalidateQueries({queryKey: ['addresses', id]});
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
    },
    
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}