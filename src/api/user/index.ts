import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/UserProvider';
import { UpdateTables } from '@/types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';


export const useGetProfile = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['profile', { userId }],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", userId)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: string;
      updatedFields: UpdateTables<'profiles'>;
    }) {
      const { error, data: updatedProfile } = await supabase
        .from('profiles')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProfile;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({queryKey: ['profile']});
      await queryClient.invalidateQueries({queryKey: ['profile', id]});
    },
  });
};