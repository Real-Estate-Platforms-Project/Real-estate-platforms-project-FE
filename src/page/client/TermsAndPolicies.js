import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../css/Auth.module.css'

function TermsAndPolicies() {
    return (
        <div>
            <header className={`${styles.bgPrimaryCustom} text-center py-5`}>
                <h1>Chính sách và Điều khoản</h1>
                <p>Điều khoản sử dụng và chính sách bảo mật của trang web Real estate platform</p>
            </header>

            {/* Main Content */}
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="mb-4">1. Giới thiệu</h2>
                        <p>Chào mừng bạn đến với Real estate platform. Khi sử dụng trang web này, bạn đồng ý với các
                            điều khoản và điều kiện được nêu dưới đây. Vui lòng đọc kỹ các điều khoản này trước khi sử
                            dụng dịch vụ của chúng tôi.</p>

                        <h2 className="mb-4">2. Điều khoản sử dụng</h2>
                        <p>Khi sử dụng website, bạn phải đảm bảo rằng các thông tin cá nhân cung cấp là chính xác và cập
                            nhật. Bất kỳ hoạt động gian lận, giả mạo thông tin đều bị nghiêm cấm.</p>
                        <ul>
                            <li>Bạn phải đủ 18 tuổi trở lên để sử dụng dịch vụ của chúng tôi.</li>
                            <li>Bạn chịu trách nhiệm cho bất kỳ thông tin nào mà bạn cung cấp, bao gồm nhưng không giới
                                hạn ở thông tin tài khoản, danh sách bất động sản, hoặc bất kỳ nội dung nào khác được
                                đăng tải trên trang web.
                            </li>
                            <li>Bất kỳ hành vi vi phạm pháp luật hoặc không phù hợp với quy tắc đạo đức xã hội đều bị
                                cấm và sẽ bị xử lý nghiêm theo quy định của pháp luật.
                            </li>
                            <li>Chúng tôi có quyền từ chối dịch vụ hoặc khóa tài khoản của bất kỳ người dùng nào vi phạm
                                các điều khoản sử dụng mà không cần báo trước.
                            </li>
                        </ul>

                        <h2 className="mb-4">3. Chính sách bảo mật</h2>
                        <p>Chúng tôi cam kết bảo mật thông tin cá nhân của bạn. Mọi thông tin thu thập sẽ được sử dụng
                            để nâng cao trải nghiệm của bạn khi sử dụng dịch vụ của chúng tôi.</p>
                        <ul>
                            <li>Chúng tôi sẽ không chia sẻ thông tin cá nhân của bạn với bên thứ ba trừ khi có sự đồng ý
                                của bạn hoặc theo yêu cầu của pháp luật.
                            </li>
                            <li>Tất cả thông tin tài khoản, danh sách giao dịch và các thông tin khác sẽ được mã hóa và
                                bảo mật tuyệt đối qua các giao thức bảo mật tiên tiến nhất.
                            </li>
                            <li>Bạn có quyền yêu cầu xóa thông tin cá nhân của mình khỏi hệ thống bất kỳ lúc nào.</li>
                        </ul>

                        <h2 className="mb-4">4. Điều khoản về giao dịch</h2>
                        <p>Mọi giao dịch bất động sản thực hiện qua hệ thống của chúng tôi đều phải tuân thủ các quy
                            định pháp luật hiện hành.</p>
                        <ul>
                            <li>Chúng tôi chỉ cung cấp nền tảng công nghệ, và không tham gia trực tiếp vào quá trình đàm
                                phán hoặc thực hiện các giao dịch bất động sản.
                            </li>
                            <li>Bạn cần đảm bảo rằng các thông tin về bất động sản mà bạn đăng tải là chính xác, đầy đủ
                                và tuân thủ các quy định pháp luật.
                            </li>
                            <li>Mọi giao dịch cần được thực hiện với sự trung thực và minh bạch. Bất kỳ hành vi gian lận
                                nào sẽ dẫn đến việc khóa tài khoản vĩnh viễn.
                            </li>
                        </ul>

                        <h2 className="mb-4">5. Quyền và nghĩa vụ của người dùng</h2>
                        <p>Người dùng có quyền truy cập, chỉnh sửa, và xóa thông tin của mình trên hệ thống. Tuy nhiên,
                            người dùng cũng phải tuân thủ các quy định của chúng tôi về bảo mật và nội dung đăng
                            tải.</p>
                        <ul>
                            <li>Bạn có quyền xem và sửa đổi các thông tin cá nhân, danh sách bất động sản của mình.</li>
                            <li>Bạn có nghĩa vụ không chia sẻ thông tin tài khoản của mình với bất kỳ ai khác. Chúng tôi
                                không chịu trách nhiệm cho bất kỳ thiệt hại nào do việc chia sẻ thông tin này gây ra.
                            </li>
                            <li>Bạn không được phép đăng tải các nội dung vi phạm bản quyền, thương hiệu hoặc các quyền
                                sở hữu trí tuệ của người khác.
                            </li>
                        </ul>

                        <h2 className="mb-4">6. Trách nhiệm của chúng tôi</h2>
                        <p>Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng trang web
                            này hoặc từ các giao dịch giữa các bên sử dụng dịch vụ của chúng tôi.</p>
                        <ul>
                            <li>Chúng tôi cung cấp dịch vụ trên cơ sở "như hiện có" và không đảm bảo rằng trang web sẽ
                                hoạt động không có lỗi hoặc gián đoạn.
                            </li>
                            <li>Chúng tôi không chịu trách nhiệm cho bất kỳ sự mất mát hoặc thiệt hại nào do việc sử
                                dụng dịch vụ gây ra, bao gồm nhưng không giới hạn ở việc mất dữ liệu, lợi nhuận, danh
                                tiếng hoặc bất kỳ thiệt hại đặc biệt nào khác.
                            </li>
                            <li>Chúng tôi có quyền thay đổi hoặc tạm ngừng cung cấp dịch vụ bất kỳ lúc nào mà không cần
                                báo trước.
                            </li>
                        </ul>

                        <h2 className="mb-4">7. Thay đổi điều khoản</h2>
                        <p>Chúng tôi có quyền thay đổi các điều khoản và chính sách bất kỳ lúc nào. Thay đổi sẽ có hiệu
                            lực ngay khi được cập nhật trên trang web.</p>
                        <ul>
                            <li>Bạn có trách nhiệm kiểm tra thường xuyên các điều khoản sử dụng để cập nhật các thay đổi
                                mới nhất.
                            </li>
                            <li>Việc tiếp tục sử dụng dịch vụ sau khi điều khoản đã được thay đổi sẽ được coi là bạn
                                đồng ý với các thay đổi đó.
                            </li>
                        </ul>

                        <h2 className="mb-4">8. Các điều khoản bổ sung</h2>
                        <p>Ngoài các điều khoản chính đã đề cập, người dùng còn phải tuân thủ các điều khoản bổ sung
                            dưới đây:</p>
                        <ul>
                            <li>Các quy định về việc quảng cáo bất động sản: Không đăng tải thông tin sai lệch hoặc lừa
                                đảo về tài sản bất động sản.
                            </li>
                            <li>Quy định về việc liên hệ giữa các bên: Mọi thông tin liên lạc giữa các bên trong giao
                                dịch phải trung thực, minh bạch và không vi phạm quy định của pháp luật.
                            </li>
                        </ul>

                        <h2 className="mb-4">9. Liên hệ</h2>
                        <p>Nếu bạn có bất kỳ thắc mắc nào về các điều khoản hoặc chính sách của chúng tôi, vui lòng liên
                            hệ với chúng tôi qua email <a
                                href="mailto:support@batdongsan.com">support@batdongsan.com</a>.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-light text-center py-4">
                <p>&copy; 2024 Real estate platform. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default TermsAndPolicies;
