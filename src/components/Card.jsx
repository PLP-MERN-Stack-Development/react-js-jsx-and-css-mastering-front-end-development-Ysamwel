export default function Card({ title, content }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
