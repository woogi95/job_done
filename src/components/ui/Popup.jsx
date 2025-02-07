export const Popup = () => {
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <span className="text-[18px] font-normal mb-2 flex justify-center items-center">
        회원탈퇴
      </span>
      <div className="text-gray-600 text-sm mb-4 pt-[20px] pb-[10px]">
        <p>정말 탈퇴하시겠습니까?</p>
        <p>탈퇴하시려면 비밀번호를 입력해주세요.</p>
      </div>

      {/* {deleteError && (
        <div className="text-red-500 text-sm mb-4 text-center">
          {deleteError}
        </div>
      )} */}

      {/* <div className="relative mb-4">
        <input
          type={deletePw ? "text" : "password"}
          placeholder="비밀번호 입력"
          value={deletePassword}
          onChange={e => setDeletePassword(e.target.value)}
          className="w-full px-3 py-2 border rounded h-[40px]"
        />
        <button
          type="button"
          onClick={() => setDeletePw(!deletePw)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777]"
        >
          {deletePw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
      </div> */}

      <div className="flex justify-end gap-2 pt-[10px]">
        {/* <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => {
            setIsDeleteModal(false);
            setDeletePassword("");
            setDeleteError("");
          }}
        >
          취소
        </button> */}
        <button
          className="px-4 py-2 bg-[#FF3044] text-white rounded"
          //   onClick={handleDeleteAccount}
        >
          홈으로가기
        </button>
      </div>
    </div>
  </div>;
};
