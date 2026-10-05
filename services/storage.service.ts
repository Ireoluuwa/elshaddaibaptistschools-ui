import { supabase } from '@/lib/supabase';

export const storageService = {
  uploadAssignmentFile: async (file: File): Promise<string> => {
    // Create a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `assignments/${fileName}`;

    const { data, error } = await supabase.storage
      .from('assignments')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('assignments')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  uploadProfileImage: async (file: File, userId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error } = await supabase.storage
      .from('profile_image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, 
      });

    if (error) {
      console.error('Supabase profile image upload error:', error);
      throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('profile_image')
      .getPublicUrl(filePath);

    // Append cache-busting timestamp so the browser doesn't show stale image
    return `${publicUrl}?t=${Date.now()}`;
  },

  // Report-sheet signatures share the public profile_image bucket for now.
  // `owner` is a term id or a staff username, used to name the file.
  uploadSignature: async (file: File, owner: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const filePath = `signatures/${owner.replace(/[^a-zA-Z0-9-]/g, '-')}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('profile_image')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('Supabase signature upload error:', error);
      throw new Error(error.message);
    }

    return supabase.storage.from('profile_image').getPublicUrl(filePath).data.publicUrl;
  },
};
