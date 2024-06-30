import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export default function SocialLoginCallback() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const isPopup = window.opener !== null;
    queryClient.invalidateQueries(['getUserInfo']);
    // 새 창에서 열렸을 때 (카카오)
    if (isPopup) {
      window.opener.postMessage({
        type: 'loginSuccess',
      });
      window.close();
    } else {
      // 깃허브 예외 반환
      window.parent.postMessage(
        {
          type: 'loginSuccess',
        },
        window.location.origin,
      );
      window.close();
    }
  }, []);

  return <div>Loading...</div>;
}
