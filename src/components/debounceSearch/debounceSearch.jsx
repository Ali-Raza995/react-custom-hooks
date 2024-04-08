import { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/debounceSearch/index';
import SearchBar from './searchBar';
import { useDebounce } from '../../hooks/useDebounce';

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      const users = await fetchUsers(debouncedSearch);
      setUsers(users);

      setLoading(false);
    };
    loadUsers();
  }, [debouncedSearch]);

  return (
    <div className='tutorial'>
      <SearchBar onChange={setSearch} />
      {loading && <div>Loading...</div>}
      {!loading &&
        users.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
    </div>
  );
}