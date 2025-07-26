import { Input } from './input.interface';

export abstract class AbstractGenerator {
  public abstract generate(input: Input): Promise<void>;
}
