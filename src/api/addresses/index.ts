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
  });
}

export const useMyAddressList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['addresses', { userId: id }],
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
  });
};

export const useInsertAddress = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<'addresses'>) {
      const { error, data: newProduct } = await supabase
        .from('addresses')
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['addresses']});
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpdateTables<'addresses'>;
    }) {
      const { error, data: updatedAddress } = await supabase
        .from('addresses')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedAddress;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({queryKey: ['addresses']});
      await queryClient.invalidateQueries({queryKey: ['addresses', id]});
    },
  });
};

export const useSelectAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id }: { id: number; }) {
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
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({queryKey: ['addresses']});
      await queryClient.invalidateQueries({queryKey: ['addresses', id]});
    },
  });
};