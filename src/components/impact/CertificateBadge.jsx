const CertificateBadge = ({ certificate }) => (
  <div className="bg-purple-50 px-3 py-1 rounded-full text-sm text-purple-700">
    🏆 {certificate.title}
  </div>
);

export default CertificateBadge;
